export default function Discord() {
  const text = `<script src='https://cdn.jsdelivr.net/npm/@widgetbot/crate@3' async defer strategy="afterInteractive">
  new Crate({
      server: '1125351036740194336', // 무피
      channel: '1125364635638452234' //
  })
</script>`;
  return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
}
