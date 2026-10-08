import type { SvgProps } from '@/types';

export function VideoPlayArrowSvg({ color = '#253746', width = 14, height = 16, ...rest }: SvgProps): JSX.Element {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 14 16' fill='none' {...rest}>
      <path d='M2.5625 14V2L11.5625 7.99653L2.5625 14Z' fill={color} />
    </svg>
  );
}
