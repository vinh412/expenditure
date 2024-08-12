import { Image } from "antd";
import React from "react";

function PaymentInfo({ paymentInfo }) {
  const [response, setResponse] = React.useState(null);
  React.useEffect(() => {
    fetch("https://api.vietqr.io/v2/generate", {
      method: "POST",
      headers: {
        "x-client-id": "fe30f3bf-b5de-4d4e-bfad-b468b11419d1",
        "x-api-key": "e4d2a4dd-6a3c-4ffa-823e-b614a687bcdc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountNo: "9704229200586016353",
        accountName: "DUONG DANG VINH",
        acqId: 970422,
        amount: paymentInfo.payAmount,
        addInfo: "Chia Hoa Don",
        format: "text",
        template: "compact2",
      }),
    })
      .then((response) => response.json())
      .then((response) => setResponse(response));
  }, [paymentInfo]);
  return response && <Image src={response.data.qrDataURL} width={250} />;
}

export default PaymentInfo;
