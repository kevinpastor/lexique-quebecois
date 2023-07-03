import { Document } from "mongodb";

/**
 * Uses Laplace's rule of succession: `rating = (likes + 1) / (total + 2)`.
 * Inspired by https://www.youtube.com/watch?app=desktop&v=qBZKJNWFoH4.
 *
 * We iterated through SteamDB's rating formula (for more information, see
 * https://steamdb.info/blog/steamdb-rating/ and
 * https://www.reddit.com/r/factorio/comments/7236or/comment/dnh3rnu/), and the
 * lower bound of Wilson score confidence interval for a Bernoulli parameter (
 * for more information, see
 * https://www.evanmiller.org/how-not-to-sort-by-average-rating.html and
 * https://stackoverflow.com/a/55857323/7817501) However, we have decided to
 * use a different formula that is simpler to understand and to implement.
 *
 * @param positiveReviewsOperator
 * Expression that evaluates to the number of positive ratings.
 * @param negativeReviewsOperator
 * Expression that evaluates to the number of negative ratings.
 * @returns Expression that evaluates the rating of an entry.
 */
export const ratingOperator = (
    positiveReviewsOperator: Document | string,
    negativeReviewsOperator: Document | string
): Document => ({
    $divide: [
        {
            $add: [
                positiveReviewsOperator,
                1
            ]
        },
        {
            $add: [
                positiveReviewsOperator,
                negativeReviewsOperator,
                2
            ]
        }
    ]
});
