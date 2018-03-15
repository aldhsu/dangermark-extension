import styled from 'styled-components';

export default styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 999999;
    background: green;
    opacity: 0.2;
    ${props => props.settings.css}
`;
