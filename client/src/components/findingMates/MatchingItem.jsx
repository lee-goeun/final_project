import React from 'react';

const MatchingListItem = ({ post }) => {
  console.log({ post });

  return (
    <div>
      <div>
        <img src={post} />
      </div>
    </div>
  );
};

export default MatchingListItem;
