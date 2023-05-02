import parse from 'html-react-parser';

export type MiddleSectionProps = {
    text: string;
};

export default function MiddleSection(props: MiddleSectionProps) {
    const { text } = props;

    const insertion = `<span className="page-question-text" role="contentinfo">${text}</span>`;

    return <div className="page-question">{parse(insertion)}</div>;
}
