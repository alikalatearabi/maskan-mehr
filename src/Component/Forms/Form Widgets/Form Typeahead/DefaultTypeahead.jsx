import React, { Fragment, useEffect, useState } from 'react';
import { CardBody, Form, FormGroup } from 'reactstrap';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import axios from "../../../../api/axios";

const DefaultTypeahead = () => {

  const token = localStorage.getItem('token')

  const [soptions, setSoptions] = useState([]);
  const [checkArrayPublic, setCheckArrayPublic] = useState([]);

  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const [optionId, setOptionId] = useState();

    // optionId.map((item) => item.id).toString()

  return (
    <Fragment>
      <CardBody>
        <div id="the-basics">
          <Form>
            <FormGroup>

              <AsyncTypeahead
                id="basic-typeahead"
                labelKey="name"
                multiple={false}
                options={checkArrayPublic}
                isLoading={searchIsLoading}

                filterBy={['name']}
                onChange={(e) => setOptionId(e)}

                emptyLabel={"علت فوت مورد نظر یافت نشد."}
                promptText={"برای اضافه کردن بنویسید..."}
                searchText={"درحال جستجو..."}
                placeholder="علت فوت را بنویسید و انتخاب کنید..."

                onSearch={(query) => {
                  setSearchIsLoading(true)
                  axios.post("/CauseOfDeath/FindCauseOfDeath", query,
                      {
                        headers: {
                          "Content-Type": "application/json",
                          "Authorize": token
                        },
                      })
                      .then(response =>
                      {
                          setCheckArrayPublic([])
                          setSoptions([])
                          response.data.map((item) =>
                              soptions.push({
                                  "id": item.id,
                                  "name": item.title,
                              })
                          )
                          setCheckArrayPublic(soptions)
                          setSearchIsLoading(false)
                      }
                );
                }}
              />
            </FormGroup>
          </Form>
        </div>
      </CardBody>
    </Fragment>
  );
};
export default DefaultTypeahead;