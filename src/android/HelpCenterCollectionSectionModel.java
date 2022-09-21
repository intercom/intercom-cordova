package io.intercom.android.sdk;

import java.util.List;

import io.intercom.android.sdk.helpcenter.sections.HelpCenterArticle;

class HelpCenterCollectionSectionModel {
    private List<HelpCenterArticle> articles;
    private String title;

    public HelpCenterCollectionSectionModel(
            List<HelpCenterArticle> articles,
            String title
    ) {
        this.articles = articles;
        this.title = title;
    }
}