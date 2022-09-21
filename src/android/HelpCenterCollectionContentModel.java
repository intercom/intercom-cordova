package io.intercom.android.sdk;

import java.util.List;

import io.intercom.android.sdk.helpcenter.sections.HelpCenterArticle;
import io.intercom.android.sdk.helpcenter.sections.HelpCenterSection;

public class HelpCenterCollectionContentModel {
    private String collectionId;
    private List<HelpCenterArticle> articles;
    private List<HelpCenterCollectionSectionModel> sections;
    private String summary;
    private String title;

    public HelpCenterCollectionContentModel(
            String collectionId,
            List<HelpCenterArticle> articles,
            List<HelpCenterCollectionSectionModel> sections,
            String summary,
            String title
    ) {
        this.collectionId = collectionId;
        this.articles = articles;
        this.sections = sections;
        this.summary = summary;
        this.title = title;
    }
}
