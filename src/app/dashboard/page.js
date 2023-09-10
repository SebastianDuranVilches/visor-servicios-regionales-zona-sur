"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import React from "react";
import { Nav, Button, Container,Col, Row } from "react-bootstrap";
import  HeadFuction  from "./components/headFunction/head";

export default function Dashboard() {
    return(
        <body>
            <Row className="headFuction">
                <Container>
                    <HeadFuction></HeadFuction>
                </Container>
            </Row>
        </body>
    );
}