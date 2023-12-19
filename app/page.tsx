import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Introduction</h1>
      <p className={styles.pagejustify}>
        Welcome to a cutting-edge solution designed to tackle the challenges
        posed by operating heavy earth-moving machinery during the rainy season.
        Our project addresses the difficulty arising from poor visibility
        conditions, leading to significant excavation and production losses over
        4-5 months.
      </p>
      <p className={styles.pagejustify}>
        At the heart of our innovation is a GPS module that provides real-time
        location data in latitude and longitude. This module has paved the way
        for the development of a dynamic live map capable of plotting the live
        locations of multiple GPS-equipped vehicles. This map not only enhances
        operational awareness but also facilitates better decision-making in the
        field.
      </p>
      <p className={styles.pagejustify}>
        In addition to the GPS module, we have integrated LiDAR technology for
        object detection. This ensures that heavy machinery can navigate with
        precision, minimizing the risk of collisions and contributing to a safer
        working environment.
      </p>
      <p className={styles.pagejustify}>
        Our website, built on the robust Next.js framework, serves as the
        platform to explore the intricacies of our solution. Join us as we
        redefine the standards for heavy machinery operations in adverse weather
        conditions, ensuring efficiency and safety in every project.
      </p>
      <br />
      <h1>Our Team</h1>
      <p className={styles.pagejustify}>
        We are a team of Six students from the Pimpri Chinchwad College of
        Engineering. We are passionate about using technology to solve
        real-world problems and are excited to share our solution with you.
      </p>
      <br />
      <div className={styles.Team}>
        <h3>Team Lead</h3>
        <p className={styles.pagejustify}>
          <a href="https://www.linkedin.com/in/kaushal-lawande-44a6062a5/">
            <b>Kaushal Lawande</b>
          </a>
        </p>
        <br />
        <h3>Team Members</h3>
        <p className={styles.pagejustify}>
          <a href="https://www.linkedin.com/in/prathamesh-chougale/">
            <b>Prathamesh Chougale</b>
          </a>
        </p>
        <p className={styles.pagejustify}>
          <a href="https://www.linkedin.com/in/prathamesh-chavan-baa10022a?">
            <b>Prathamesh Chavan</b>
          </a>
        </p>
        <p className={styles.pagejustify}>
          <a href="https://www.linkedin.com/in/yash-jadhav-7b87a1231/">
            <b>Yash Jadhav</b>
          </a>
        </p>
        <p className={styles.pagejustify}>
          <a href="https://www.linkedin.com/in/aditi-chandanwar-a42227237/">
            <b>Aditi Chandanwar</b>
          </a>
        </p>
        <p className={styles.pagejustify}>
          <a href="https://www.linkedin.com/in/aanchal-gulhane-470441237">
            <b>Aachal Gulhane</b>
          </a>
        </p>
      </div>
    </main>
  );
}
