import { Document } from "mongodb";

// Lower bound of Wilson score confidence interval for a Bernoulli parameter
// Inspired by https://www.evanmiller.org/how-not-to-sort-by-average-rating.html and https://stackoverflow.com/a/55857323/7817501
export const getReviewScore = (positiveRatingExpression: Document | string, negativeRatingExpression: Document | string): Document => ({
    $cond: {
        if: {
            $gt: [
                {
                    $add: [
                        positiveRatingExpression,
                        negativeRatingExpression
                    ]
                },
                0
            ]
        },
        then: {
            $divide: [
                {
                    $subtract: [
                        {
                            $divide: [
                                {
                                    $add: [
                                        positiveRatingExpression,
                                        1.9208
                                    ]
                                },
                                {
                                    $add: [
                                        positiveRatingExpression,
                                        negativeRatingExpression
                                    ]
                                }
                            ]
                        },
                        {
                            $multiply: [
                                1.96,
                                {
                                    $divide: [
                                        {
                                            $sqrt: {
                                                $add: [
                                                    {
                                                        $divide: [
                                                            {
                                                                $multiply: [
                                                                    positiveRatingExpression,
                                                                    negativeRatingExpression
                                                                ]
                                                            },
                                                            {
                                                                $add: [
                                                                    positiveRatingExpression,
                                                                    negativeRatingExpression
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    0.9604
                                                ]
                                            }
                                        },
                                        {
                                            $add: [
                                                positiveRatingExpression,
                                                negativeRatingExpression
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    $add: [
                        {
                            $divide: [
                                3.8416,
                                {
                                    $add: [
                                        positiveRatingExpression,
                                        negativeRatingExpression
                                    ]
                                }
                            ]
                        },
                        1
                    ]
                }
            ]
        },
        else: 0
    }
});
