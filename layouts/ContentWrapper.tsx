export default function ContentWrapper(props: any) {
  const {children, className, ...reset} = props;
  return (
    <>
      <section
        className={`mx-auto max-w-3xl px-5 xl:max-w-5xl ${className && className}`}
        {...reset}
      >
        {children}
      </section>
    </>
  );
}
