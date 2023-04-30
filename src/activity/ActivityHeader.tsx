export type ActivityHeaderProps = {
  header: string;
  subHeader: string;
};

export default function ActivityHeader(props: ActivityHeaderProps) {
  const { header, subHeader } = props;

  return (
    <header className="page-header">
      <h1>{header}</h1>
      <h2>{subHeader}</h2>
    </header>
  );
}
