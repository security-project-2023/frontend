import { useQuery } from "@tanstack/react-query";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import ModalBase from "../Base";
import Product from "@/api/Product";
import { Product as ProductType } from "@/api/Product/get";
import Purchase from "@/api/Purchase";
import { Purchase as PurchaseType } from "@/api/Purchase/create";

const clientKey = "test_ck_ORzdMaqN3wyma2oZ657gr5AkYXQG";
const customerKey = nanoid();

function usePaymentWidget(clientKey: string, customerKey: string) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}

type SeatType = {
  name: string;
  price: number;
};

type Props = {
  productId: string;
  productTitle: string;
  seat: SeatType;
  isOpen: boolean;
  closeHandler: () => void;
};

export default function Checkout(props: Props) {
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  // const agreementsWidgetRef = useRef<ReturnType<
  //   PaymentWidgetInstance["renderAgreement"]
  // > | null>(null);
  const [product, setProduct] = useState<ProductType>();
  const [purchase, setPurchase] = useState<PurchaseType>();

  async function purchaseHandler() {
    await Purchase.create({
      price: props.seat.price,
      seat: props.seat.name,
      title: props.productTitle,
      time: product?.time!,
    }).then((purchase) => {
      setPurchase(purchase.data);
    });
  }

  useEffect(() => {
    if (props.productId == null) return;

    Product.findOneById(props.productId).then((product) => {
      setProduct(product.data);
    });
  }, [props.productId]);

  useEffect(() => {
    if (paymentWidget == null) return;
    if (props.isOpen === false) return;

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: props?.seat?.price },
      { variantKey: "DEFAULT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;

    paymentWidget.renderAgreement("#agreement", {
      variantKey: "AGREEMENT",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentWidget, props.isOpen]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) return;

    paymentMethodsWidget.updateAmount(props?.seat?.price);
  }, [props?.seat?.price]);

  return (
    <>
      <ModalBase
        zIndex={2}
        isOpen={props.isOpen}
        closeHandler={props.closeHandler}
      >
        <Wrapper>
          <div id="payment-widget" style={{ width: "100%" }} />
          <div id="agreement" style={{ width: "100%" }} />
          <ButtonWrapper>
            <Button
              onClick={async () => {
                await purchaseHandler();

                try {
                  await paymentWidget?.requestPayment({
                    orderId: nanoid(),
                    orderName: props.productTitle,
                    customerName: "남영재",
                    customerEmail: "op@ye0ngjae.com",
                    customerMobilePhone: "01091507439",
                    successUrl: `${window.location.origin}/payments/success/${purchase?.id}`,
                    failUrl: `${window.location.origin}/payments/fail/${purchase?.id}`,
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              구매하기
            </Button>
          </ButtonWrapper>
        </Wrapper>
      </ModalBase>
    </>
  );
}

const Wrapper = styled.div`
  width: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 16px;
  overflow: hidden;
  align-items: center;
  position: relative;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 54px;
  border-radius: 16px;
  background-color: #ff9900;
  color: white;
  font-size: 16px;
`;
