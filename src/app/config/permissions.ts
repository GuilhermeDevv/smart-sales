const permissions = {
  smart_sales: {
    operador: ["smart_sales", "ranking_vendas"],
    gestores: ["smart_sales", "ranking_vendas", "configuracoes"],
    super_admin: ["smart_sales", "ranking_vendas", "configuracoes"],
  },
};

function hasPermission(
  module: keyof typeof permissions,
  role: keyof (typeof permissions)[typeof module],
  action: string
): boolean {
  return permissions[module]?.[role]?.includes(action) || false;
}

// exemplo de uso
// const canAccess = hasPermission("smart_sales", "operador", "extrato_vendas");

export { permissions, hasPermission };
