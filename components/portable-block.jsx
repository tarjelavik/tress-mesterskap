import { PortableText as PortableTextComponent } from '@portabletext/react'
import markdownStyles from "./markdown-styles.module.css";

export default function PortableBlock({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <PortableTextComponent value={content} className={markdownStyles.markdown} components={{}} {...props} />
    </div>
  );
}

