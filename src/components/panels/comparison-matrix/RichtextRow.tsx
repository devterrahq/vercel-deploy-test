import { ResolveRichText } from '@npm-refactored/storyblok-rich-text';
import type { ComparisonMatrixRichTextRowStoryblok } from '@/component-types';
import type { MatrixContentRow } from '@npm-refactored/pr-comparison-matrix';

export function GetRichtextRow(textRow: ComparisonMatrixRichTextRowStoryblok): MatrixContentRow {
  const cells: Array<React.ReactNode | undefined> = [undefined, undefined, undefined, undefined, undefined, undefined];
  if (textRow.item_1) {
    cells[0] = ResolveRichText(textRow.item_1);
  }
  if (textRow.item_2) {
    cells[1] = ResolveRichText(textRow.item_2);
  }
  if (textRow.item_3) {
    cells[2] = ResolveRichText(textRow.item_3);
  }
  if (textRow.item_4) {
    cells[3] = ResolveRichText(textRow.item_4);
  }
  if (textRow.item_5) {
    cells[4] = ResolveRichText(textRow.item_5);
  }
  if (textRow.item_6) {
    cells[5] = ResolveRichText(textRow.item_6);
  }

  const tRow: MatrixContentRow = {
    key: textRow._uid || 'matrix-content-row-key',
    row_type: 'content',
    label_desktop: ResolveRichText(textRow.label),
    label_mobile: ResolveRichText(textRow.label),
    row_class: textRow.row_style,
    data_cells: cells,
  };
  return tRow;
}
