import styles from "./Meals.summery.module.scss";
const MealsSummary = () => {
    return (
        <section className={styles.summary}>
            <h2>غذای خوشمزه, سلامتی بری شما</h2>
            <p>
                ...بهترین غذای مورد علاقه ات رو انتخاب کن, و سفارش بده و برای
                شام یا ناهارت میل بکن
            </p>
            <p>
                تمام غذا های این رستوران توسط بهترین اشپزان ایران به بهترین
                کیفیت درست شده ان. فرصت رو از دست نده و همین الان سفارش بده
            </p>
        </section>
    );
};
export default MealsSummary;
