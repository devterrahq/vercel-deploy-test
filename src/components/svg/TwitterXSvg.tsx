import type { SvgProps } from '@/types';

export function TwitterXSvg({ color = '#7A99AC', width = 30, height = 30, ...rest }: SvgProps): JSX.Element {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 30 30' fill='none' {...rest}>
      <path
        id='Vector'
        d='M17.6363 12.7029L28.6683 0H26.0541L16.4751 11.0299L8.82431 0H0L11.5694 16.679L0 30H2.61447L12.7303 18.3522L20.8101 30H29.6344L17.636 12.7029H17.6368H17.6363ZM14.0555 16.8258L12.8832 15.165L3.55634 1.94941H7.57177L15.0988 12.6148L16.2711 14.2755L26.0553 28.1389H22.0399L14.0557 16.8262V16.8255L14.0555 16.8258Z'
        fill={color}
      />
    </svg>
  );
}
