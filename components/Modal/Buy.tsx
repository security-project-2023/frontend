import styled from "styled-components";
import Base from "./Base";
import { useMemo, useState } from "react";
import Modal from ".";
import { Product as ProductType } from "@/api/Product/get";

type Props = {
  product: ProductType;
  isOpen: boolean;
  closeHandler: () => void;
};

export default function Buy(props: Props) {
  const [select, setSelect] = useState(0);
  const [payment, setPayment] = useState(false);
  const seatType = useMemo(() => {
    if (!props.product) return [];
    return props.product.tiers?.map((tier, index) => ({
      name: tier,
      price: Number(props?.product?.prices[index]),
    }));
  }, [props.product]);

  return (
    <>
      <Base isOpen={props.isOpen} closeHandler={props.closeHandler}>
        <Wrapper>
          <Title>좌석 선택</Title>
          <Row>
            {seatType.map((seat, index) => (
              <Seat
                key={index}
                isSelect={select === index}
                onClick={() => setSelect(index)}
              >
                <h1>{seat.name}석</h1>
                <p>{seat.price.toLocaleString()}원</p>
              </Seat>
            ))}
          </Row>
          <Button onClick={() => setPayment(true)}>구매하기</Button>
        </Wrapper>
      </Base>
      <Modal.Payments.Checkout
        productTitle={props.product?.title}
        isOpen={payment}
        closeHandler={() => setPayment(true)}
        seat={seatType![select]}
      />
    </>
  );
}

const Wrapper = styled.div`
  width: 390px;
  padding: 20px;
  border-radius: 16px;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const Seat = styled.button<{ isSelect?: boolean }>`
  width: 110px;
  padding: 10px 0;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 400;
  border: 2px solid
    ${({ isSelect }) => (isSelect ? "#ff9900 !important" : "#e6e6e6")};
  text-align: center;
  background-color: ${({ isSelect }) =>
    isSelect ? "#ff990050 !important" : "#ffffff"};

  &:hover {
    border: 2px solid #ff99005e;
    background-color: #ff990011;
  }

  h1 {
    color: ${({ isSelect }) => (isSelect ? "#ff9900 !important" : "#000000")};
    font-weight: ${({ isSelect }) => (isSelect ? 600 : 400)};
    font-size: 18px;
  }

  p {
    color: #888888;
    font-weight: 400;
    font-size: 14px;
  }

  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 16px;
  background-color: #ff9900;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border: none;
`;
