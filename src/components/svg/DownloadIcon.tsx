import type { SvgProps } from '@/types';

const DownloadIcon = ({ color = '#253746', width = 16, height = 16, ...rest }: SvgProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
    <path
      d='M12 18L4.5 10.5L6.6 8.325L10.5 12.225V0H13.5V12.225L17.4 8.325L19.5 10.5L12 18ZM3 24C2.175 24 1.46875 23.7063 0.88125 23.1188C0.29375 22.5313 0 21.825 0 21V16.5H3V21H21V16.5H24V21C24 21.825 23.7063 22.5313 23.1188 23.1188C22.5313 23.7063 21.825 24 21 24H3Z'
      fill={color}
    />
  </svg>
);

export { DownloadIcon };
