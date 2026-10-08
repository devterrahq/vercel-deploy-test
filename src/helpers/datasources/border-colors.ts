const PREFIX = 'border-color-';
export function BorderColorKeyToClassName(key: string | undefined) {
  switch (key) {
    case 'white':
      return `${PREFIX}white`;
    case 'black':
      return `${PREFIX}black`;
    case 'gray':
      return `${PREFIX}gray`;
    case 'light-gray':
      return `${PREFIX}light-gray`;
    case 'light-blue':
      return `${PREFIX}light-blue`;
    case 'light-gray-blue':
      return `${PREFIX}light-gray-blue`;
    case 'blue':
      return `${PREFIX}blue`;
    case 'dark-blue':
      return `${PREFIX}dark-blue`;
    case 'maroon':
      return `${PREFIX}maroon`;
    case 'orange':
      return `${PREFIX}orange`;
    default:
      return '';
  }
}
