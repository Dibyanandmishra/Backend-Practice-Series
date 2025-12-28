import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const isValidVideoId = mongoose.Types.ObjectId.isValid(videoId);
    if (!isValidVideoId) {
        throw new ApiError(400, "Invalid video id");
    }

    const { page = 1, limit = 10 } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const totalComment = await Comment.countDocuments({ video: videoId });

    const comments = await Comment.find({ video: videoId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("owner", "username avatar");

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                comments,
                page: pageNum,
                limit: limitNum,
                totalComment
            },
            "Video comments fetched successfully"
        )
    );
});

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video 
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }