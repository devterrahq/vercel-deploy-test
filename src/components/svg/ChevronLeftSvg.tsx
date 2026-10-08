import type { SvgProps } from '@/types';

export function ChevronLeftSvg({ color = '#253746', width = 7, height = 12, ...rest }: SvgProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.60691 13L8 11.6295L2.78596 6.5L8 1.37054L6.60691 3.7608e-07L-5.68248e-07 6.5L6.60691 13Z'
        fill={color}
      />
    </svg>
  );
}
