import { register } from "@/api/auth/register";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import styled from "styled-components";

export default function Signup() {
  const [visible, setVisible] = useState(true);
  const [reVisible, setReVisible] = useState(true);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const router = useRouter();

  const signupHandler = useCallback(() => {
    if (password !== rePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    register({ id, password })
      .then((res) => {
        if (res.status === 201) {
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("회원가입에 실패했습니다.");
      });
  }, [id, password, rePassword, router]);

  return (
    <>
      <Wrapper>
        <Container>
          <TitleWrapper>
            <Logo src="/images/logo.svg" />
            <SubTitle>회원가입 후 서비스를 이용하실 수 있습니다.</SubTitle>
          </TitleWrapper>
          <Column
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              signupHandler();
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
                  placeholder="비밀번호 입력해주세요"
                />
                <InputIcon
                  src={`/images/icons/${visible ? "visible" : "invisible"}.svg`}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setVisible(!visible)}
                />
              </InputBox>
              <InputBox>
                <InputIcon src="/images/icons/password.svg" />
                <Input
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  type={reVisible ? "password" : "text"}
                  placeholder="비밀번호 확인"
                />
                <InputIcon
                  src={`/images/icons/${
                    reVisible ? "visible" : "invisible"
                  }.svg`}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setReVisible(!reVisible)}
                />
              </InputBox>
            </InputWrapper>
            <Column gap={12}>
              <Button>회원가입</Button>
              <AuthWrapper>
                <Link href="/login">로그인</Link>
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
