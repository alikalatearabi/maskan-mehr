import { H4, H6 } from '../../../AbstractElements';
import { lineChart2 } from '../../../PagesDef/Widgets/Charts/WidgetChartsData';
import React, { Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Col, Row } from 'reactstrap';
import { PROJECTS } from '../../../Constant';

const ProjectChart = () => {
  return (
    <Fragment>
      <Col xl="4" md="6" className="box-col-4">
        <Card className="o-hidden">
          <div className="chart-widget-top">
            <div className="card-body">
              <Row>
                <Col xs="7">
                  <H6 attrH6={{ className: 'f-w-600 font-secondary' }}>{PROJECTS}</H6><span className="num"><span className="counter">30</span>%<i className="icon-angle-up f-12 ms-1"></i></span>
                </Col>
                <Col xs="5" className="text-end">
                  <H4 attrH4={{ className: 'num total-value counter' }}>12569</H4>
                </Col>
              </Row>
            </div>
            <div>
              <div id="chart-widget2">
                <ReactApexChart className="flot-chart-placeholder" options={lineChart2.options} series={lineChart2.series} height="170" type="area" id="chart-widget-top-second" />
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};
export default ProjectChart;