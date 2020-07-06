import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(0.4em);
  }
  to { 
    opacity: 1;
    transform: translateY(0em);
  }
`;

export const SiteLink = styled.a.attrs((props) => ({
  href: `${props.url}`,
  alt: props.alt,
  className: props.highlight,
  rel: `noopener noreferrer`,
}))`
  display: inline;
  font-size: 3em;
  text-decoration: none;
  overflow-wrap: anywhere;
  color: #111111;
  opacity: 0;
  transform: translateY(0.4em);
  animation: ${fadeIn} 1.5s ease ${(props) => props.index}ms forwards;
`;
