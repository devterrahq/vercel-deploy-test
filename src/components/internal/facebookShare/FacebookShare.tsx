// https://support.rocketspark.com/hc/en-us/articles/115010441268-How-do-I-add-a-Facebook-LIKE-button-to-my-website-
import Script from 'next/script';

interface FacebookShareProps {
  href: string;
}
export default function FacebookShare({ href }: FacebookShareProps) {
  return (
    <div>
      <div id='fb-root'></div>
      <Script
        strategy='afterInteractive'
        src='https://connect.facebook.net/en_US/sdk.js#xfbml=1
             &version={process.env.NEXT_PUBLIC_FACEBOOK_GRAPH_API_VERSION}
             &appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}'
      />
      <div
        className='fb-like'
        data-href={href}
        data-width=''
        data-layout='standard'
        data-action='like'
        data-size='small'
        data-share='true'
      />
    </div>
  );
}
