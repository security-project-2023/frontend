import Link from "next/link";
import styled from "styled-components";
import Search from "./Search";

export default function Header() {
  const menus = [
    { name: "뮤지컬", params: "musical" },
    { name: "콘서트", params: "concert" },
    { name: "연극", params: "play" },
    { name: "클래식/무용", params: "classic" },
    { name: "스포츠", params: "sports" },
    { name: "레저/캠핑", params: "leisure" },
    { name: "전시/행사", params: "exhibition" },
    { name: "아동/가족", params: "child" },
    { name: "영화", params: "movie" },
  ];

  return (
    <>
      <Wrapper>
        <Top>
          <TopContainer>
            <Link href="/">
              <Logo src="/images/logo.svg" />
            </Link>
            <Row gap={20}>
              <Search />
              <AuthWrapper>
                <Link href="/login">로그인</Link>
                <Link href="/signup">회원가입</Link>
              </AuthWrapper>
            </Row>
          </TopContainer>
        </Top>
        <Bottom>
          <BottomContainer>
            {menus.map((menu) => (
              <Link key={menu.params} href={`/category/${menu.params}`}>
                {menu.name}
              </Link>
            ))}
          </BottomContainer>
        </Bottom>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: center;
`;

const TopContainer = styled.div`
  width: 1200px;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 80px;
`;

const Row = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap}px;
`;

const AuthWrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    color: #353535;
    font-size: 14px;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Bottom = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;

const BottomContainer = styled.div`
  width: 1200px;
  height: 100%;

  padding: 10px 0;

  display: flex;
  align-items: center;
  gap: 50px;

  a {
    color: #000;
    font-size: 14px;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }
`;
