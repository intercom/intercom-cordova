const ContentType = {
  Article: "ARTICLE",
  Carousel: "CAROUSEL",
  Survey: "SURVEY",
  HelpCenterCollections: "HELP_CENTER_COLLECTIONS",
  Conversation: "CONVERSATION",
  Ticket: "TICKET",
};

var IntercomContent = {
  articleWithArticleId(articleId) {
    let articleContent = {};
    articleContent.type = ContentType.Article;
    articleContent.id = articleId;
    return articleContent;
  },

  carouselWithCarouselId(carouselId) {
    let carouselContent = {};
    carouselContent.type = ContentType.Carousel;
    carouselContent.id = carouselId;
    return carouselContent;
  },

  surveyWithSurveyId(surveyId) {
    let surveyContent = {};
    surveyContent.type = ContentType.Survey;
    surveyContent.id = surveyId;
    return surveyContent;
  },

  helpCenterCollectionsWithIds(collectionIds) {
    let helpCenterCollectionsContent = {};
    helpCenterCollectionsContent.type = ContentType.HelpCenterCollections;
    helpCenterCollectionsContent.ids = collectionIds;
    return helpCenterCollectionsContent;
  },

  conversationWithConversationId(conversationId) {
    let conversationContent = {};
    conversationContent.type = ContentType.Conversation;
    conversationContent.id = conversationId;
    return conversationContent;
  },

  ticketWithTicketId(ticketId) {
    let ticketContent = {};
    ticketContent.type = ContentType.Ticket;
    ticketContent.id = ticketId;
    return ticketContent;
  },
};

module.exports = IntercomContent;
