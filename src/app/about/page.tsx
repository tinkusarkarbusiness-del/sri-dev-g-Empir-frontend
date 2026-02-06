
import Image from "next/image";

export default function AboutPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>About Sri Dev G Empire</h1>

      <p>
        SriDev G Empire is a next-generation digital technology platform built
        to deliver secure, scalable, and intelligent solutions for users,
        businesses, and innovators. Our ecosystem combines modern web
        technology, AI-driven systems, and user-centric design.
      </p>

      <h2>Our Vision</h2>
      <p>
        To create a trusted digital empire where technology empowers people,
        simplifies processes, and unlocks new opportunities globally.
      </p>

      <h2>Our Mission</h2>
      <ul>
        <li>Provide secure and transparent digital services</li>
        <li>Build scalable platforms with long-term vision</li>
        <li>Maintain user trust, privacy, and performance</li>
      </ul>

      <hr style={{ margin: "40px 0" }} />

      <h2>Founder & CEO</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Image
          src="/ceo.jpg"
          alt="Sri Barendra Sarkar - CEO"
          width={160}
          height={160}
          style={{ borderRadius: "12px" }}
        />
        <div>
          <h3>Sri Barendra Sarkar</h3>
          <p><strong>Founder & CEO – Sri Dev G Empire</strong></p>
          <p>
            Sri Barendra Sarkar is a visionary entrepreneur focused on building
            powerful digital platforms with transparency, innovation, and
            long-term growth. His leadership drives Sri Dev G Empire toward
            becoming a globally trusted tech brand.
          </p>
        </div>
      </div>
    </div>
  );
}
