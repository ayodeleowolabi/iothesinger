'use client'

import Script from 'next/script'

export default function StripeButton() {
  return (
    <>
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />
      <div dangerouslySetInnerHTML={{
        __html: `<stripe-buy-button
          buy-button-id="buy_btn_1TEFoAFWfur8Ysi1v6kEZcEy"
          publishable-key="pk_live_51TEEznFWfur8Ysi1AoUlZYD76TcRwSc7e7EvLzMB3958CLKQEgJ8QxpKkJWFWwkzwpP9xU7M2HMgu5maUwGMglq200Wl1YJK00"
        ></stripe-buy-button>`
      }} />
    </>
  )
}