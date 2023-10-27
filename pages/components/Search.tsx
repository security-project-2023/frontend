import { useRouter } from "next/router";
import { useState } from "react";
import { styled } from "styled-components";

export default function Search() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <>
      <Wrapper
        onSubmit={(e) => {
          e.preventDefault();
          router.push({
            pathname: "/search",
            query: { search },
          });
        }}
      >
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="어떤 영화를 보고 싶으세요?"
          type="text"
        />
        <button type="submit">
          <SearchIcon src="/images/icons/search.svg" />
        </button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.form`
  width: 240px;
  padding: 8px 12px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  gap: 12px;

  background-color: #f8f8f8;
`;

const Input = styled.input`
  min-width: 0;
  flex: 1;

  font-size: 12px;
  font-weight: 500;

  background-color: transparent;
  color: #000000;

  &::placeholder {
    color: #9d9d9d;
  }
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;
