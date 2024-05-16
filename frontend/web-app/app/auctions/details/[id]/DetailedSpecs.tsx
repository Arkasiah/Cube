'use client';

import {Auction} from "@/types";
import {Table} from "flowbite-react";

type Props = {
    auction: Auction
}
export default function DetailedSpecs({auction}: Props) {
    return (
        <Table striped={true}>
            <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Vendeur
                    </Table.Cell>
                    <Table.Cell>
                        {auction.seller}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Marque
                    </Table.Cell>
                    <Table.Cell>
                        {auction.make}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Modèle
                    </Table.Cell>
                    <Table.Cell>
                        {auction.model}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Année de fabrication
                    </Table.Cell>
                    <Table.Cell>
                        {auction.year}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Kilométrage
                    </Table.Cell>
                    <Table.Cell>
                        {auction.mileage}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Prix de réserve ? 
                    </Table.Cell>
                    <Table.Cell>
                        {auction.reservePrice > 0 ? 'Oui' : 'Non'}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}