import Eth from "@/api/Eth";
import { abi } from "@/constants/abi";
import useWeb3 from "@/hooks/useWeb3";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Web3 from "web3";

export default function Reservation() {
  const [account, web3] = useWeb3();
  const [tickets, setTickets] = useState<string[]>();

  async function getTickets() {
    if (!account || !web3) return;

    const tickets = await Eth.getTicketsByOwnerId(account as string);

    const newTickets = tickets?.data?.filter((ticket: any) => {
      if (ticket[5] == 0) return null;
      return ticket;
    });

    setTickets(newTickets);

    return newTickets;
  }

  useEffect(() => {
    getTickets().then((res) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <Wrapper>
        <Container>
          <Title>예약 확인</Title>
          <Menus>
            <MenuItem>
              <h1
                style={{
                  textAlign: "left",
                }}
              >
                이름
              </h1>
              <Row>
                <h1>날짜</h1>
                <h1>좌석</h1>
              </Row>
            </MenuItem>
            <Column>
              {tickets &&
                tickets.map((ticket, index) => (
                  <MenuItem key={index}>
                    <p
                      style={{
                        textAlign: "left",
                      }}
                    >
                      {ticket[2]}
                    </p>
                    <Row>
                      <p
                        style={{
                          width: "auto",
                        }}
                      >
                        {ticket[4]}
                      </p>
                      <p>{ticket[3]}</p>
                    </Row>
                  </MenuItem>
                ))}
            </Column>
          </Menus>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 1200px;
  padding-top: 30px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
`;

const Menus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    text-align: right;
    width: 100px;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    text-align: right;
    width: 100px;
    font-size: 18px;
    font-weight: 400;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
