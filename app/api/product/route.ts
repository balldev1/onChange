import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const {
            name,
            status,
            visibility,
            publishOn,
            catalogVisibility,
            description,
            regularPrice,
            salePrice,
            taxStatus,
            taxClass,
            productLayout,
            productStyle,
            sku,
            stockManagement,
            quantity,
            allowBackorders,
            lowStockThreshold,
            stockStatus,
            soldIndividually,
            totalStockQuantity,
            weight,
            shippingClass,
            specifications,
            categories,
        } = await req.json();

        const product = await prisma.product.create({
            data: {
                name,
                status: status || 'Published',
                visibility: visibility || 'Public',
                publishOn: publishOn ? new Date(publishOn) : new Date(),
                catalogVisibility: catalogVisibility || 'Shop and search results',
                description: description || '',
                regularPrice: regularPrice || 0,
                salePrice: salePrice || 0,
                taxStatus: taxStatus || 'Taxable',
                taxClass: taxClass || 'Standard',
                productLayout: productLayout || 'Default',
                productStyle: productStyle || 'Default',
                sku: sku || null,
                stockManagement: stockManagement || true,
                quantity: quantity || 0,
                allowBackorders: allowBackorders || 'Do not allow',
                lowStockThreshold: lowStockThreshold || 0,
                stockStatus: stockStatus || null,
                soldIndividually: soldIndividually || false,
                totalStockQuantity: totalStockQuantity || 0,
                weight: weight || 0,
                shippingClass: shippingClass || 'No shipping class',
                specifications: specifications || {},
                categories: categories || [],
            },
        });

        return NextResponse.json(product);

    } catch (error) {
        return NextResponse.json({ error: error.message || 'Failed to create product' });
    } finally {
        await prisma.$disconnect();
    }
}
