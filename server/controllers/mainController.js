// data 처리 로직 좋아요 순으로 정렬해서 리스트에 담고 그 값을 메인 페이지로 보내줌. [게시판이랑 메인 페이지 미완이라 보내고 받는 값을 모름..]

// 좋아요 많은 순
exports.likeQuick = (req, res) => {
  try {
    // 게시글 좋아요, 댓글 좋아요
    quickSort = (req, res) => {
      if (req.length < 2) {
        return req;
      }
      const pivot = [req[0]];
      const left = [];
      const right = [];
      for (let i = 1; i < req.length; i++) {
        if (req[i] < pivot) {
          left.push(req[i]);
        } else if (req[i] > pivot) {
          right.push(req[i]);
        } else {
          pivot.push(req[i]);
        }
      }
      return quickSort(left).concat(pivot, quickSort(right));
    };
    const sorted = quickSort([]);
    console.log(sorted);
  } catch (err) {
    console.log(err);
  }
};

// 조회수 많은 순
exports.viewQuick = (req, res) => {
  try {
    // 조회수 정렬
    quickSort = (req, res) => {
      if (req.length < 2) {
        return req;
      }
      const pivot = [req[0]];
      const left = [];
      const right = [];
      for (let i = 1; i < req.length; i++) {
        if (req[i] < pivot) {
          left.push(req[i]);
        } else if (req[i] > pivot) {
          right.push(req[i]);
        } else {
          pivot.push(req[i]);
        }
      }
      return quickSort(left).concat(pivot, quickSort(right));
    };
    const sorted = quickSort([]);
    console.log(sorted);
  } catch (err) {
    console.log(err);
  }
};

// 즐겨찾기 많은 순
exports.favoritesQuick = (req, res) => {
  try {
    quickSort = (req, res) => {
      if (req.length < 2) {
        return req;
      }
      const pivot = [req[0]];
      const left = [];
      const right = [];
      for (let i = 1; i < req.length; i++) {
        if (req[i] < pivot) {
          left.push(req[i]);
        } else if (req[i] > pivot) {
          right.push(req[i]);
        } else {
          pivot.push(req[i]);
        }
      }
      return quickSort(left).concat(pivot, quickSort(right));
    };
    const sorted = quickSort([]);
    console.log(sorted);
  } catch (err) {
    console.log(err);
  }
};
