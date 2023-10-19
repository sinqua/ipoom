export default function Layout({ children }: { children: React.ReactNode }) {
  
  console.log("레이아웃 세번째 ", children);
  return <>{children}</>;
}
