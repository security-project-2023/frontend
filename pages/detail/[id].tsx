import { styled } from "styled-components";
import Modal from "../../components/Modal";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import Product from "@/api/Product";
import { Age, Product as ProductType, ageToKorean } from "@/api/Product/get";
import Web3 from "web3";

export default function Detail() {
  const [modal, setModal] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductType>();

  const id = useMemo(() => {
    if (params) return params.id as string;
    return "";
  }, [params]);

  useEffect(() => {
    if (!id) return;

    Product.findOneById(id)
      .then((product) => {
        setProduct(product.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert("존재하지 않는 상품입니다.");
          router.push("/");
        }
      });
  }, [id, router]);

  return (
    <>
      <Modal.Buy
        product={product!}
        isOpen={modal}
        closeHandler={() => setModal(false)}
      />
      <Wrapper>
        <Container>
          <DetailWrapper>
            <Poster src={product?.thumbnail} />
            <Column>
              <ContentWrapper>
                <Title>{product?.title}</Title>
                <Row>
                  <Key>장소</Key>
                  <Value>{product?.place}</Value>
                </Row>
                <Row>
                  <Key>진행시간</Key>
                  <Value>{product?.time}</Value>
                </Row>
                <Row>
                  <Key>관람 연령</Key>
                  <Value>{ageToKorean[product?.age as Age]}</Value>
                </Row>
                <Row
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Key>좌석</Key>
                  {product?.tiers?.map((tier, index) => (
                    <Row key={index}>
                      <Key
                        style={{
                          marginLeft: 20,
                          fontSize: 16,
                          width: 60,
                          color: "#141414",
                        }}
                      >
                        {tier}
                      </Key>
                      <Value>
                        {Web3.utils.fromWei(product?.prices?.[index], "ether")}{" "}
                        ETH
                      </Value>
                    </Row>
                  ))}
                </Row>
              </ContentWrapper>
              <PaymentWrapper>
                <Price>
                  {product && Web3.utils.fromWei(product.prices[0], "ether")}{" "}
                  ETH
                </Price>
                <PaymentButton onClick={() => setModal(true)}>
                  예매하기
                </PaymentButton>
              </PaymentWrapper>
            </Column>
          </DetailWrapper>
          <DescWrapper>
            <DescTitle>상품 설명</DescTitle>
            <DescContent>{product?.description}</DescContent>
          </DescWrapper>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  padding-top: 60px;
`;

const Container = styled.div`
  width: 1200px;

  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
`;

const DetailWrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 30px;

  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Poster = styled.img`
  width: 350px;
  aspect-ratio: 3/4;
  object-fit: cover;

  border-radius: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;

  padding: 4px 0 0 0;
`;

const Title = styled.h1`
  font-size: 28ㄴㄴpx;
  font-weight: 600;
  padding-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Key = styled.h1`
  font-size: 16px;
  font-weight: 600;
  width: 80px;
  color: #888888;
`;

const Value = styled.h1`
  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.h1`
  font-size: 28x;
  font-weight: 600;

  text-align: right;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PaymentButton = styled.button`
  width: 100%;
  height: 54px;
  border-radius: 16px;
  background-color: #ff9900;
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    background-color: #ff9900;
  }
`;

const DescWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DescTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const DescContent = styled.h1`
  font-size: 16px;
  font-weight: 400;
`;
