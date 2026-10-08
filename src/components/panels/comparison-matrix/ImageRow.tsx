import { Image } from '@npm-refactored/storyblok-next-image';
import { ResolveRichText } from '@npm-refactored/storyblok-rich-text';
import type { ComparisonMatrixImageRowStoryblok } from '@/component-types';
import type { MatrixContentRow } from '@npm-refactored/pr-comparison-matrix';

export function GetImageRow(imageRow: ComparisonMatrixImageRowStoryblok): MatrixContentRow {
  const cells: Array<React.ReactNode | undefined> = [undefined, undefined, undefined, undefined, undefined, undefined];
  if (imageRow.item_1 && imageRow.item_1.filename) {
    cells[0] = <Image src={imageRow.item_1} />;
  }
  if (imageRow.item_2 && imageRow.item_2.filename) {
    cells[1] = <Image src={imageRow.item_2} />;
  }
  if (imageRow.item_3 && imageRow.item_3.filename) {
    cells[2] = <Image src={imageRow.item_3} />;
  }
  if (imageRow.item_4 && imageRow.item_4.filename) {
    cells[3] = <Image src={imageRow.item_4} />;
  }
  if (imageRow.item_5 && imageRow.item_5.filename) {
    cells[4] = <Image src={imageRow.item_5} />;
  }
  if (imageRow.item_6 && imageRow.item_6.filename) {
    cells[5] = <Image src={imageRow.item_6} />;
  }

  const iRow: MatrixContentRow = {
    key: imageRow._uid,
    row_type: 'content',
    row_class: imageRow.row_style,
    label_desktop: ResolveRichText(imageRow.label),
    label_mobile: ResolveRichText(imageRow.label),
    data_cells: cells,
  };

  return iRow;
}
