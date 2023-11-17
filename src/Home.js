import React from 'react';
import { Card, CardBody, CardTitle } from "reactstrap";

function Home() {
    return (
        <section>
            <Card>
                <CardBody className="text-center">
                    <CardTitle>
                        <h3 className="font-weight-bold">
                            Welcome to Snack or Booze
                        </h3>
                    </CardTitle>
                </CardBody>
            </Card>
        </section>
    )
}

export default Home;