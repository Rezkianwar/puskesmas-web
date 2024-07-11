import styles from "../../../ui/dashboard/cards/singleCards/singleCards.module.css";
import { fetchCard } from "../../../lib/service/cardService";
import { updateCard } from "../../../lib/actions/actionCards";

const SingleCard = ({ params }) => {
  const { id } = params;

  const card = fetchCard(id);

  console.log("Fetched Card:", card);

  if (!card) {
    return (
      <div>
        <p>Card not found</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updateCard} method="POST" className={styles.form}>
          <input type="hidden" name="id" value={card._id} />
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={card.title}
          />
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            rows="30"
            defaultValue={card.description}
          ></textarea>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCard;
