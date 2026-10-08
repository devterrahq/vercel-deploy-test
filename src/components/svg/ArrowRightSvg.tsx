import type { SvgProps } from '@/types';

export function ArrowRightSvg({ color = '#253746', width = 16, height = 17, ...rest }: SvgProps): JSX.Element {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 16 17' fill='none' {...rest}>
      <path
        d='M9.34935 12.8155L8.63268 12.1155L11.4327 9.3155H2.66602V8.3155H11.4327L8.61602 5.49883L9.33268 4.79883L13.3493 8.8155L9.34935 12.8155Z'
        fill={color}
      />
    </svg>
  );
}
