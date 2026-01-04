"use client";

import { useInventoryStore } from "@/lib/stores/useInventoryStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle } from "lucide-react";

export default function InventoryPage() {
    const { items, getLowStockItems } = useInventoryStore();
    const lowStock = getLowStockItems();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Inventario de Clínica</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Ítems</CardTitle>
                        <Package className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{items.length}</div>
                        <p className="text-xs text-slate-500">Categorías activas: {new Set(items.map(i => i.category)).size}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">{lowStock.length}</div>
                        <p className="text-xs text-slate-500">Ítems bajo umbral mínimo</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Listado de Insumos</CardTitle>
                        <Button size="sm">Nuevo Ítem</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead className="text-right">Stock Actual</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Última Reposición</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-xs font-mono">{item.sku}</TableCell>
                                    <TableCell className="capitalize">{item.category}</TableCell>
                                    <TableCell className="text-right font-bold">{item.quantity} {item.unit}</TableCell>
                                    <TableCell>
                                        {item.quantity <= item.minThreshold ? (
                                            <Badge variant="destructive" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Bajo Stock</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200">En Orden</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right text-slate-500">{item.lastRestock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
