import DefaultStyles from './DefaultStyles';
import HorizontalStyles from './HorizontalStyles';
import InlineStyles from './InlineStyles';
import NoBorders from './NoBorders';
import OfferStyle from './OfferStyle';
import SolidBoard from './SolidBoard';
import VerticalStyles from './VerticalStyles';
import { Container, Row } from 'reactstrap';
import React, { Fragment } from 'react';

const MegaOptionsContain = () => {
    return (
      <Fragment>
        <Container fluid={true}>
          <Row>
            <DefaultStyles />
            <NoBorders />
            <SolidBoard />
            <OfferStyle />
            <InlineStyles />
            <VerticalStyles />
            <HorizontalStyles />
          </Row>
        </Container>

      </Fragment>
    );
};
export default MegaOptionsContain;