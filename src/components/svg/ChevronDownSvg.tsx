import type { SvgProps } from '@/types';

export function ChevronDownSvg({ color = '#253746', width = 14, height = 9, ...rest }: SvgProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.5 1.89309L1.87054 0.499999L7 5.71404L12.1295 0.499999L13.5 1.89309L7 8.5L0.5 1.89309Z'
        fill={color}
      />
    </svg>
  );
}
