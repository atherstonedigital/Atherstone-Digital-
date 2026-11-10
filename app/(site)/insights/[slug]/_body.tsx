import * as React from 'react';
import type { MDXComponents } from 'mdx/types';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import { TextLink } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { cn } from '@/lib/utils';

// An article's Markdown body as the brand sets running copy (brand book, Type and Iconography): body at the measure,
// H2s in heading-1 over a rule hairline (the SectionHeading, as every H2 on the site), H3s in heading-2, links as text
// links, lists with the CSS dash, tables on rule hairlines, code on paper-raised. No third face: code is set in the
// sans (Tailwind's preflight would give it the system monospace), marked by its raised ground and rule border.
//
// The renderer is next-mdx-remote's compileMDX (already in package.json), run at build time with format 'md': the
// body is read as plain Markdown plus GitHub tables, so no JSX, import or expression in a post is ever evaluated. Two
// small plugins keep the published look:
//
// - Soft line breaks become line breaks. The old /blog renderer turned every line into its own paragraph, so a bold
//   label on one line and its explanation on the next (the Shopify SEO playbook's numbered checks) read as two lines.
// - Tables stack below 720px. Each row becomes a block, its first cell the row header in weight 600, and every other
//   cell carries its column head as a label above the value (aria-hidden: the table roles still give screen readers
//   the real header). Nothing scrolls sideways at 320px (brand book, Layout).
//
// Images are refused at build time: the site's images go through next/image with explicit dimensions (CLAUDE.md), and
// the plan allows diagrams and screenshots only. Add one to the page, not the Markdown.

// ------------------------------------------------------------------ plugins (unified trees, typed as far as used)

interface TreeNode {
  type: string;
  value?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: TreeNode[];
}

/** mdast: split text at soft line breaks and put a break node between the parts (as remark-breaks does). */
function remarkSoftBreaks() {
  const visit = (node: TreeNode) => {
    if (!node.children) return;
    node.children = node.children.flatMap((child) => {
      if (child.type === 'text' && child.value?.includes('\n')) {
        return child.value
          .split(/\r?\n/)
          .flatMap((part, index): TreeNode[] =>
            index === 0 ? [{ type: 'text', value: part }] : [{ type: 'break' }, { type: 'text', value: part }],
          );
      }
      visit(child);
      return [child];
    });
  };
  return (tree: TreeNode) => visit(tree);
}

function elements(node: TreeNode | undefined, tagName: string): TreeNode[] {
  return (node?.children ?? []).filter((child) => child.type === 'element' && child.tagName === tagName);
}

function textOf(node: TreeNode): string {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(textOf).join('');
}

/** hast: column heads get scope col; each body row's first cell becomes its row header; the rest carry their head. */
function rehypeTableLabels() {
  const label = (table: TreeNode) => {
    const head = elements(table, 'thead')[0];
    const headCells = elements(elements(head, 'tr')[0], 'th');
    headCells.forEach((cell) => {
      cell.properties = { ...cell.properties, scope: 'col' };
    });
    const heads = headCells.map(textOf);
    elements(elements(table, 'tbody')[0], 'tr').forEach((row) => {
      elements(row, 'td').forEach((cell, index) => {
        if (index === 0) {
          cell.tagName = 'th';
          cell.properties = { ...cell.properties, scope: 'row' };
        } else if (heads[index]) {
          cell.properties = { ...cell.properties, dataLabel: heads[index] };
        }
      });
    });
  };
  const visit = (node: TreeNode) => {
    if (node.type === 'element' && node.tagName === 'table') label(node);
    node.children?.forEach(visit);
  };
  return (tree: TreeNode) => visit(tree);
}

// ------------------------------------------------------------------ elements

/** Internal routes go through next/link (TextLink does that); anything with a scheme leaves the site. */
function leavesSite(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith('mailto:') && !href.startsWith('tel:');
}

/** The H2 marker the flow below keys its spacing on. */
const H2_CLASS = 'article-h2';

function Heading2({ children }: { children?: React.ReactNode }) {
  return <SectionHeading heading={children} className={H2_CLASS} />;
}

function Heading3({ children }: { children?: React.ReactNode }) {
  return <h3 className="heading-2 max-w-measure">{children}</h3>;
}

type CellProps = React.ComponentPropsWithoutRef<'td'> & { 'data-label'?: string };

const components: MDXComponents = {
  // One H1 per page: the ArticleHeader's. A Markdown H1 is set as an H2.
  h1: Heading2,
  h2: Heading2,
  h3: Heading3,
  h4: Heading3,
  h5: Heading3,
  h6: Heading3,
  p: ({ children }) => <p className="body max-w-measure">{children}</p>,
  a: ({ href = '', children }) => (
    <TextLink href={href} external={leavesSite(href)}>
      {children}
    </TextLink>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="list-dash body max-w-measure [&_ul]:mt-space-3">{children}</ul>,
  ol: ({ children }) => (
    <ol className="body max-w-measure list-outside list-decimal pl-[1.25em] [&>li+li]:mt-space-3">{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="max-w-measure border border-rule bg-paper-raised p-space-4 [&>*+*]:mt-space-4">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="max-w-measure border-0 border-t border-rule" />,
  code: ({ children }) => (
    <code className="rounded-radius-0 border border-rule bg-paper-raised px-space-1 font-sans text-[0.9375em]">{children}</code>
  ),
  pre: ({ children }) => (
    <pre
      className={cn(
        'small max-w-measure whitespace-pre-wrap break-words border border-rule bg-paper-raised p-space-4 font-sans',
        '[&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em]',
      )}
    >
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <table role="table" className="block w-full max-w-measure min-[720px]:table min-[720px]:border-collapse">
      {children}
    </table>
  ),
  thead: ({ children }) => (
    <thead role="rowgroup" className="block min-[720px]:table-header-group [&>tr]:block min-[720px]:[&>tr]:table-row">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody
      role="rowgroup"
      className={cn(
        'block min-[720px]:table-row-group',
        '[&>tr]:block [&>tr]:border-b [&>tr]:border-rule [&>tr]:py-space-4',
        'min-[720px]:[&>tr]:table-row min-[720px]:[&>tr]:py-0',
      )}
    >
      {children}
    </tbody>
  ),
  tr: ({ children }) => <tr role="row">{children}</tr>,
  th: ({ scope, children }) =>
    scope === 'row' ? (
      <th
        scope="row"
        role="rowheader"
        className="body block text-left align-top font-semibold min-[720px]:table-cell min-[720px]:py-space-3 min-[720px]:pr-space-4"
      >
        {children}
      </th>
    ) : (
      <th
        scope="col"
        role="columnheader"
        className="body border-b border-rule-strong pb-space-3 pr-space-4 text-left align-bottom font-semibold max-[719px]:sr-only"
      >
        {children}
      </th>
    ),
  td: ({ children, ...props }: CellProps) => {
    const label = props['data-label'];
    return (
      <td
        role="cell"
        className="body mt-space-2 block align-top min-[720px]:mt-0 min-[720px]:table-cell min-[720px]:py-space-3 min-[720px]:pr-space-4"
      >
        {label ? (
          <span aria-hidden="true" className="eyebrow block text-ink-muted min-[720px]:hidden">
            {label}
          </span>
        ) : null}
        {children}
      </td>
    );
  },
  img: () => {
    throw new Error('Markdown images are not rendered: add the image to the page with next/image and its dimensions.');
  },
};

/**
 * The vertical rhythm of the body: space-4 between blocks, space-12 above each H2 and the hairline's own space-4 below
 * it, space-8 above an H3 and space-2 under it, space-8 around a rule and space-6 around a table. The H2 selectors
 * name H2_CLASS in full, because Tailwind only finds class names written out whole.
 */
const flow = cn(
  '[&>*+*]:mt-space-4',
  '[&>.article-h2]:mt-space-12 [&>.article-h2:first-child]:mt-0 [&>.article-h2+*]:mt-0',
  '[&>h3]:mt-space-8 [&>h3+*]:mt-space-2',
  '[&>hr]:my-space-8 [&>hr+*]:mt-0',
  '[&>table]:my-space-6 [&>table+*]:mt-0',
);

/** Compiles the body at build time. Call it from the page (a server component) and render the element it returns. */
export async function renderArticleBody(markdown: string): Promise<React.ReactElement> {
  const { content } = await compileMDX({
    source: markdown,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        format: 'md',
        remarkPlugins: [remarkGfm, remarkSoftBreaks],
        rehypePlugins: [rehypeTableLabels],
      },
    },
  });
  return <div className={flow}>{content}</div>;
}
