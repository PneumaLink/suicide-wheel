const weightedRandomSelect = (items: {name: string; stack: number;}[]) => {
    // 모든 항목의 stack 값을 합산합니다.
    const totalStack = items.reduce((sum, item) => sum + item.stack, 0);

    // 랜덤 값과 각 항목의 stack에 기반한 가중치로 항목을 선택합니다.
    const threshold = Math.random() * totalStack;

    // 가중치를 기반으로 항목을 선택합니다.
    let runningSum = 0;
    for (const item of items) {
        runningSum += item.stack;
        if (runningSum > threshold) {
        return item;
        }
    }

    // 모든 가중치를 더했는데도 threshold를 넘지 못한 경우 마지막 항목을 반환합니다.
    // 이 경우는 발생하지 않아야 하지만, 확실성을 위해 넣습니다.
    return items[items.length - 1];
};
  
// 이 함수를 사용하여 multiple items를 선택하고 싶을 때,
// 다음과 같은 함수를 사용하여 randomResult 배열을 업데이트할 수 있습니다.
const selectRandomItems = (items: {name: string; stack: number;}[], numberOfItems: number) => {
    let selectedItems = [];
    let itemsCopy = [...items]; // 원본 배열을 변경하지 않도록 복사본을 만듭니다.

    for (let i = 0; i < numberOfItems; i++) {
        // 가중치에 따라 항목을 랜덤하게 선택합니다.
        const selectedItem = weightedRandomSelect(itemsCopy);

        // 선택된 항목을 결과 배열에 추가합니다.
        selectedItems.push(selectedItem);

        // 이미 선택된 항목은 추후 추첨에서 제외합니다.
        itemsCopy = itemsCopy.filter(item => item !== selectedItem);
    }

    return selectedItems;
};

export {weightedRandomSelect, selectRandomItems}