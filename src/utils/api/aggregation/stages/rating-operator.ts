import { Document } from "mongodb";

/**
 * Uses the formula: `rating = score - (score - 0.5) * 2 ^ -log3(total + 1)`.
 *
 * For more information, see https://steamdb.info/blog/steamdb-rating/ or
 * https://www.reddit.com/r/factorio/comments/7236or/comment/dnh3rnu/.
 *
 * We previously used the lower bound of Wilson score confidence interval for a
 * Bernoulli parameter. The function was previously inspired by
 * https://www.evanmiller.org/how-not-to-sort-by-average-rating.html and
 * https://stackoverflow.com/a/55857323/7817501. However, we have decided to
 * use a different formula that is simpler to understand and to implement.
 *
 * @param positiveReviewsOperator
 * Expression that evaluates to the number of positive ratings.
 * @param negativeReviewsOperator
 * Expression that evaluates to the number of negative ratings.
 * @param certaintyGrowthScale
 * The scale of the growth of certainty. SteamDB uses a value of 10 which means
 * that for every 10x the reviews we have, we should be 2x more certain that the
 * rating is correct.
 * @returns Expression that evaluates the rating of an entry.
 */
export const ratingOperator = (
    positiveReviewsOperator: Document | string,
    negativeReviewsOperator: Document | string,
    certaintyGrowthScale: number = 3
): Document => ({
    $let: {
        vars: {
            total: {
                $add: [
                    positiveReviewsOperator,
                    negativeReviewsOperator
                ]
            }
        },
        in: {
            $cond: {
                if: {
                    $eq: [
                        "$$total",
                        0
                    ]
                },
                then: 0.5,
                else: {
                    $let: {
                        vars: {
                            score: {
                                $divide: [
                                    positiveReviewsOperator,
                                    "$$total"
                                ]
                            }
                        },
                        in: {
                            $subtract: [
                                "$$score",
                                {
                                    $multiply: [
                                        {
                                            $subtract: [
                                                "$$score",
                                                0.5
                                            ]
                                        },
                                        {
                                            $pow: [
                                                2,
                                                {
                                                    $multiply: [
                                                        -1,
                                                        {
                                                            $log: [
                                                                {
                                                                    $add: [
                                                                        "$$total",
                                                                        1
                                                                    ]
                                                                },
                                                                certaintyGrowthScale
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
});
