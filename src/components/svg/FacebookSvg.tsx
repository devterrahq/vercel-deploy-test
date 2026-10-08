import type { SvgProps } from '@/types';

export function FacebookSvg({ color = '#7A99AC', width = 31, height = 30, ...rest }: SvgProps): JSX.Element {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 31 30' fill='none' {...rest}>
      <path
        id='Vector'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M30.1332 15.0906C30.1332 6.75709 23.3869 0 15.0666 0C6.74634 0 0 6.75709 0 15.0906C0 22.6224 5.50873 28.8655 12.7125 29.9987V19.4541H8.88594V15.0906H12.7125V11.766C12.7125 7.98455 14.9624 5.8941 18.4035 5.8941C20.052 5.8941 21.7766 6.18917 21.7766 6.18917V9.90321H19.8758C18.0053 9.90321 17.4201 11.066 17.4201 12.2611V15.0906H21.5984L20.9312 19.4541H17.4208V30C24.6245 28.8675 30.1332 22.6245 30.1332 15.0906Z'
        fill={color}
      />
    </svg>
  );
}
