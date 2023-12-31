import { login } from "@/api/auth/login";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import styled from "styled-components";

export default function Login() {
  const [visible, setVisible] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginHandler = useCallback(() => {
    login({ id, password })
      .then((res) => {
        if (res.status === 201) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패했습니다.");
      });
  }, [id, password, router]);

  return (
    <>
      <Wrapper>
        <Container>
          <TitleWrapper>
            <Logo src="/images/logo.svg" />
            <SubTitle>로그인 후 서비스를 이용하실 수 있습니다.</SubTitle>
          </TitleWrapper>
          <Column
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
            gap={20}
          >
            <InputWrapper>
              <InputBox>
                <InputIcon src="/images/icons/user.svg" />
                <Input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  type="text"
                  placeholder="아이디를 입력해주세요"
                />
              </InputBox>
              <InputBox>
                <InputIcon src="/images/icons/password.svg" />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={visible ? "password" : "text"}
                  placeholder="비밀번호를 입력해주세요"
                />
                <InputIcon
                  src={`/images/icons/${visible ? "visible" : "invisible"}.svg`}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setVisible(!visible)}
                />
              </InputBox>
            </InputWrapper>
            <Column gap={12}>
              <Button>로그인하기</Button>
              <AuthWrapper>
                <Link href="/signup">회원가입</Link>
                <Link href="/signup">아이디/비밀번호</Link>
              </AuthWrapper>
            </Column>
          </Column>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  width: 90%;
  max-width: 400px;
  flex-direction: column;
  gap: 32px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 14px;
`;

const Logo = styled.img`
  width: 120px;
`;

const SubTitle = styled.h1`
  font-size: 16px;
  font-weight: 400;
  color: #797979;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputBox = styled.div`
  display: flex;
  gap: 12px;
  background-color: #f5f5f5;
  padding: 18px 24px;
  border-radius: 40px;
`;

const Input = styled.input`
  flex: 1;
  background-color: transparent;
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: #c4c4c4;
  }
`;

const InputIcon = styled.img`
  width: 24px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background-color: #ff9900;
  border-radius: 40px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const Column = styled.div<{ gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap}px;
`;

const Row = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap}px;
`;

const AuthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;

  a {
    color: #353535;
    font-size: 14px;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }

    &:first-child {
      color: #ff9900;
      font-weight: 700;
    }

    &:last-child {
      color: #797979;
    }
  }
`;

const LineWrapper = styled.div`
  width: 100%;
  height: 1px;

  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #c4c4c4;
  }
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: #c4c4c4;
`;
